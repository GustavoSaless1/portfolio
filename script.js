// Filtro de projetos: nenhuma requisição ou banco de dados é necessário.
const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
filters.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let visible = 0;
    projects.forEach(project => {
      project.hidden = category !== 'todos' && project.dataset.category !== category;
      if (!project.hidden) visible += 1;
    });
    document.querySelector('#filter-status').textContent = `${visible} projetos exibidos.`;
  });
});

// Conversa guiada de demonstração. Não conecta ao WhatsApp nem usa IA.
const messages = document.querySelector('#messages');
const options = document.querySelector('#chat-options');

function addMessage(text, type) {
  const paragraph = document.createElement('p');
  paragraph.className = `bubble ${type}`;
  paragraph.textContent = text; // textContent evita interpretar o conteúdo como HTML.
  messages.append(paragraph);
}

function showChoices(labels, onChoose, moveFocus = true) {
  options.replaceChildren();
  for (const label of labels) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', () => {
      addMessage(label, 'outgoing');
      onChoose(label);
    });
    options.append(button);
  }
  if (moveFocus) options.firstElementChild.focus({preventScroll: true});
}

function startChat(event) {
  messages.replaceChildren();
  addMessage('Olá! Para qual serviço você gostaria de pedir um orçamento?', 'incoming');
  showChoices(['Troca de óleo', 'Revisão antes de viajar'], service => {
    addMessage('Qual é o modelo e o ano do carro?', 'incoming');
    showChoices(['Onix 2020', 'Argo 2022'], car => {
      addMessage('Certo! Seu pedido ficou assim: ' + service + ' para ' + car + '. Em um atendimento conectado, a equipe receberia esse resumo para confirmar o valor e a disponibilidade.', 'incoming');
      options.replaceChildren();
      document.querySelector('#restart-chat').focus({preventScroll: true});
    });
  }, Boolean(event));
}
document.querySelector('#restart-chat').addEventListener('click', startChat);
startChat();

// Configure com código do país + DDD + número, somente dígitos.
// Contato do portfólio confirmado por Gustavo.
const WHATSAPP_NUMBER = '5511949847074';
// O link em <noscript> e o endereço inicial do botão flutuante também ficam no HTML.
function whatsappUrl(message) {
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}
document.querySelector('#social-zap').href = whatsappUrl('Olá, Gustavo! Gostaria de conversar sobre um projeto.');

const projectForm = document.querySelector('#project-form');
const summaryResult = document.querySelector('#summary-result');
const whatsappLink = document.querySelector('#whatsapp-link');
function clearSummary() {
 summaryResult.hidden = true;
 document.querySelector('#summary-placeholder').hidden = false;
 whatsappLink.hidden = true;
 whatsappLink.removeAttribute('href');
}
projectForm.addEventListener('input', clearSummary);
projectForm.addEventListener('change', clearSummary);
projectForm.closest('.builder-grid').hidden = false;
projectForm.elements.business.addEventListener('input', () => projectForm.elements.business.setCustomValidity(''));
projectForm.addEventListener('submit', event => {
 event.preventDefault();
 const business = projectForm.elements.business;
 business.setCustomValidity(business.value.trim() ? '' : 'Conte qual é o seu negócio.');
 if (!projectForm.reportValidity()) return;
 const data = new FormData(projectForm);
 const features = data.getAll('features');
 const details = String(data.get('details')).trim();
 const summary = [
 'Olá, Gustavo! Montei minha ideia pelo seu portfólio.', '',
 'Meu negócio: ' + String(data.get('business')).trim(),
 'Meu objetivo: ' + data.get('objective'),
 'Gostaria de incluir: ' + (features.length ? features.join(', ') : 'Quero sua orientação.'),
 ...(details ? ['Mais detalhes: ' + details] : []), '',
 'Podemos conversar sobre as possibilidades e um orçamento?'
 ].join('\n');
 document.querySelector('#project-summary-text').textContent = summary;
 document.querySelector('#summary-placeholder').hidden = true;
 summaryResult.hidden = false;
 whatsappLink.href = whatsappUrl(summary);
 whatsappLink.hidden = false;
 document.querySelector('#summary-title').focus();
});
document.querySelector('#edit-project').addEventListener('click', () => projectForm.elements.business.focus());
// Escolha manual do site mostrado na abertura.
const featuredProjects = {
  studio: { name: 'Studio Gabi Sales', url: 'https://studiogabisales.com/' },
  jet: { name: 'Jet Car Oficina Mecânica', url: 'https://oficinajetcar.com/' }
};
const projectSwitcher = document.querySelector('.hero-project-switcher');
const projectButtons = projectSwitcher.querySelectorAll('[data-hero-project]');
const frames = document.querySelectorAll('.showcase-frame');
const featuredLink = document.querySelector('#hero-project-link');
const featuredName = document.querySelector('#hero-project-name');

const rotationButton = document.querySelector('#rotate-projects');
let currentProject = 0;
let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let timer;
function showProject(index) {
  currentProject = index;
  const project = featuredProjects[projectButtons[index].dataset.heroProject];
  featuredName.textContent = project.name;
  document.querySelector('.hero-art').dataset.scene = projectButtons[index].dataset.heroProject;
  frames.forEach((frame, i) => {
    frame.classList.toggle('active', i === index);
    frame.setAttribute('aria-hidden', String(i !== index));
  });
  featuredLink.href = project.url;
  featuredLink.setAttribute('aria-label', 'Visitar ' + project.name + ', abre nova aba');
  projectButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
}
function updateRotation() {
  clearInterval(timer);
  rotationButton.textContent = playing ? 'Pausar troca' : 'Iniciar troca';
  if (playing && !document.hidden && document.activeElement !== featuredLink) {
    timer = setInterval(() => showProject((currentProject + 1) % projectButtons.length), 4000);
  }
}
projectButtons.forEach((button, index) => button.addEventListener('click', () => {
  playing = false;
  updateRotation();
  showProject(index);
}));
rotationButton.addEventListener('click', () => {
  playing = !playing;
  updateRotation();
});
featuredLink.addEventListener('focus', updateRotation);
featuredLink.addEventListener('blur', () => setTimeout(updateRotation, 0));
document.addEventListener('visibilitychange', updateRotation);
projectSwitcher.hidden = false;
updateRotation();

// Preencha apenas com os endereços públicos confirmados por Gustavo.
const GITHUB_URL = '';
const LINKEDIN_URL = '';

function mostrarPerfil(nome, endereco) {
  if (!endereco.startsWith('https://')) return;
  document.querySelectorAll('[data-profile="' + nome + '"]').forEach(link => {
    link.href = endereco;
    link.hidden = false;
    link.parentElement.hidden = false;
  });
}
mostrarPerfil('github', GITHUB_URL);
mostrarPerfil('linkedin', LINKEDIN_URL);
