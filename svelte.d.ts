declare module "*.svelte" {
    type Component = new (args: { target: Element }) => unknown;
    const component: Component;
    export default component;
}
