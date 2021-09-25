import fs from "fs/promises";
import path from "path";
import { escapeRegExp } from "lodash";
import { log } from "../lib/log";

interface Options {
  componentPath: string;
}

export async function main(options: Options) {
  log(`Generating component`);

  const componentDir = path.resolve(options.componentPath);
  const componentName = path.basename(componentDir);
  const templateDir = path.resolve(__dirname, "../../templates/component");
  const templateFiles = await fs.readdir(templateDir);
  await Promise.all(
    templateFiles.map((templateName) =>
      processTemplate({
        componentDir,
        componentName,
        templateDir,
        templateName,
      })
    )
  );
}

function resolveRelative(...parts: string[]) {
  return path.relative(process.cwd(), path.resolve(...parts));
}

function regexFromString(targetString: string) {
  return new RegExp(escapeRegExp(targetString), "g");
}

interface ProcessTemplateOptions {
  componentDir: string;
  componentName: string;
  templateDir: string;
  templateName: string;
}

async function processTemplate(options: ProcessTemplateOptions) {
  const templateComponentNameRegex = regexFromString("TemplateComponentName");
  const templatePath = resolveRelative(
    options.templateDir,
    options.templateName
  );

  const outputPath = resolveRelative(
    options.componentDir,
    options.templateName.replace("TemplateComponentName", options.componentName)
  );

  const outputContent = (await fs.readFile(templatePath, "utf8"))
    .replace(templateComponentNameRegex, options.componentName)
    .replace("// @ts-nocheck\n", "");

  log(`Writing file ${outputPath}`);

  await fs.mkdir(options.componentDir, { recursive: true });
  await fs.writeFile(outputPath, outputContent);
}
