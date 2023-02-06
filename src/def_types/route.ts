import type { allowedRole } from '@/utils';

export interface I_Route {
	path: string | string[];
	component: React.LazyExoticComponent<() => JSX.Element>;
	fallback: JSX.Element;
	auth: boolean;
	role: allowedRole[];
	title?: string;
	exact: boolean;
}
