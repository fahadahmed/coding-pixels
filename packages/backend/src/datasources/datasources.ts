import blogDataSources, { BlogDataSources } from "./BlogDataSource";

export type DataSources = BlogDataSources;

const datasources = (): DataSources => ({
  ...blogDataSources()
});

export default datasources;