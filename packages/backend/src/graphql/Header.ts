import { objectType, extendType } from "nexus";
import headerData from '../data/data.mock.json';
import { Header } from '../models';

const allOptions: Header[] = headerData.data;

const getOptions = (heading:string) => 
  allOptions.filter(item => item.headerType === heading);

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.string('iconName');
    t.string('label');
  }
});

export const HeaderOptionsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('personalCategories', {
      type: 'Category',
      resolve() {
        return getOptions('personalCategories')[0].data;
      }
    }),
    t.nonNull.list.field('businessCategories', {
      type: 'Category',
      resolve() {
        return getOptions('businessCategories')[0].data;
      }
    }),
    t.nonNull.list.field('personalCategoriesDesktop', {
      type: 'Category',
      resolve() {
        return getOptions('personalCategoriesDesktop')[0].data;
      }
    }),
    t.nonNull.list.field('businessCategoriesDesktop', {
      type: 'Category',
      resolve() {
        return getOptions('businessCategoriesDesktop')[0].data;
      }
    })
  }
});