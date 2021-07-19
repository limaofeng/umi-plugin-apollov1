import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { IApi } from '@umijs/types';
import { IBag, IOptions } from '..';
import { winPath } from '@umijs/utils';

export default (api: IApi, bag: IBag) =>
  api.onGenerateFiles(() => {
    const indexPath = 'apollo/index.tsx';
    const templatePath = bag.joinApolloTemplatePath('index.tsx');
    const optionsFile = winPath(bag.optionsFile!);
    const options: IOptions = api.config.apollo;

    const indexTemplate = readFileSync(templatePath, 'utf-8');
    api.writeTmpFile({
      path: indexPath,
      content: api.utils.Mustache.render(indexTemplate, {
        OptionsFile: optionsFile,
        logging: options.logging,
      }),
    });
  });
