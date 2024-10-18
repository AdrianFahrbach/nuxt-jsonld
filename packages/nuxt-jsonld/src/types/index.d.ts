import type { WithContext, Graph, Thing } from 'schema-dts';
export type JsonLD<T extends Thing = Thing> = WithContext<T> | WithContext<T>[] | Graph | null;
export type JsonLDFunc<T extends Thing = Thing> = () => JsonLD<T>;
