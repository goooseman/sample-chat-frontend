export const component = () => {
  const element = document.createElement('div');

  element.innerHTML = ['Hello', 'webpack'].join(" ");
  
  return element;
}

document.body.appendChild(component());
