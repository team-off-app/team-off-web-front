const showErrorOverlay = (err: Error) => {
  const ErrorOverlay = customElements.get('vite-error-overlay');
  if (!ErrorOverlay) {
    return;
  }
  console.log(err);
  const overlay = new ErrorOverlay(err);
  document.body.appendChild(overlay);
};

addEventListener('error', (e) => showErrorOverlay(e.error));
addEventListener('unhandledrejection', ({ reason }) =>
  showErrorOverlay(reason)
);
