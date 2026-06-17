(function(){
  const root = document.documentElement;
  const body = document.body;
  return {
    htmlClass: root.className,
    bodyBeforeBg: getComputedStyle(body, '::before').backgroundImage,
    bodyAfterBg: getComputedStyle(body, '::after').background,
    color999: getComputedStyle(root).getPropertyValue('--color-999').trim()
  };
})();
