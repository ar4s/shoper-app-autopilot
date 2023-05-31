declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */
  class ShopApp {
    constructor(callback: (...params: any[]) => any);
    init(reserved: null, callback: (params: any, app: ShopApp) => void): string;
    show(reserved: null, callback: (app: ShopApp) => void): string;
    adjustIframeSize(): void;
    // TODO: callbacks
    alert(params: { msg: string; type: 'info' | 'error' | 'warning' | 'question' });
    confirm(
      params: {
        msg: string;
        type: 'info' | 'error' | 'warning' | 'question';
      },
      sucess?: (ret: { button: 'ok' | 'cancel' }) => void,
      error?: VoidFunction,
    );
    flashMessage(params: { msg: string; type: 'info' | 'error' | 'warning' | 'success' });
  }
  const GRAPHQL_URL: string;
}
export {};
