import path, { join, basename, resolve } from 'path';
import { IApi } from '@umijs/types';
import _ from 'lodash';
import assert from 'assert';
// import makePageGenerator from 'umi-build-dev/lib/plugins/commands/generate/generators/page';
import { Generator, randomColor } from '@umijs/utils';

const capitalizeFirstLetter = x => `${x.charAt(0).toUpperCase()}${x.slice(1)}`;
const getPath = fullPath =>
  fullPath.endsWith('/index') ? fullPath.replace(/\/index$/, '') : fullPath;
const getName = path => _.lowerFirst(_.startCase(path).replace(/\s/g, ''));

export default (api: IApi) => {
  // const PageGenerator = makePageGenerator(api);
  const { paths, config } = api;

  return class PageGenerator extends Generator {
    constructor(opts: any) {
      super(opts);
      // const pageGeneratorOptions = {
      //   ...options,
      //   resolved: require.resolve('umi-build-dev/lib/plugins/commands/generate/generators/page'),
      // };
      // this.pageGenerator = new PageGenerator(args, pageGeneratorOptions);
    }

    writing() {
      // this.pageGenerator.writing();

      // const pagePath = this.args[0].toString();
      // const path = getPath(pagePath);
      const name = getName(path);
      // const jsxExt = this.isTypeScript ? 'tsx' : 'js';
      // const jsExt = this.isTypeScript ? 'ts' : 'js';
      // const cssExt = this.options.less ? 'less' : 'css';

      const pageName = name;
      // const pageTypeName = `${capitalizeFirstLetter(name)}Page`;
      // const pageVarName = `${name}Page`;

      this.copyTpl({
        templatePath: join(__dirname, `page.ejs`),
        target: '',
        context: {
          path,
          name: pageName,
        },
        // join(paths.absPagesPath, `${pagePath}.${jsxExt}`),
        // {
        //   pagePath,
        //   cssExt,
        //   pageName,
        //   pageTypeName,
        //   pageVarName,
        // },
      });

      // this.fs.copyTpl(
      //   this.templatePath('schema.ejs'),
      //   join(paths.absPagesPath, path, `schema.${jsExt}`),
      //   {
      //     pageName,
      //     pageTypeName,
      //     pageVarName,
      //   },
      // );

      // this.fs.copyTpl(
      //   this.templatePath('resolvers.ejs'),
      //   join(paths.absPagesPath, path, `resolvers.${jsExt}`),
      //   {
      //     pageName,
      //     pageTypeName,
      //     pageVarName,
      //   },
      // );
    }
  };
};
