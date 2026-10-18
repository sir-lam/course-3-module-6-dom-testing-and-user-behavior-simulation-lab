function createElementWithAttributes(tag, attributes = {}, text) {
  const element = document.createElement(tag)
  Object.entries(attributes).forEach(([attr, value]) => {
    element.setAttribute(attr, value)
  })
  if (text !== undefined) element.textContent = text
  return element
}

function getElementOrError(id) {
  const element = document.getElementById(id)
  if (!element) {
    displayError(`Element with id "${id}" not found`)
    return null
  }
  return element
}

function displayError(message) {
  const errorElement = document.getElementById('error-message')
  if (!errorElement) {
    console.error(message)
    return
  }
  errorElement.textContent = message
  errorElement.classList.remove('hidden')
}

function clearError() {
  const errorElement = document.getElementById('error-message')
  if (!errorElement) return
  errorElement.textContent = ''
  errorElement.classList.add('hidden')
}

function addElementToDOM(containerId, text) {
  const container = getElementOrError(containerId)
  if (!container) return null
  const paragraph = createElementWithAttributes('p', { class: 'dynamic-item' }, text)
  container.appendChild(paragraph)
  return paragraph
}

function removeElementFromDOM(elementId) {
  const element = getElementOrError(elementId)
  if (!element) return false
  element.remove()
  return true
}

function updateElementText(elementId, text) {
  const element = getElementOrError(elementId)
  if (!element) return false
  element.textContent = text
  return true
}

function simulateClick(containerId, text) {
  clearError()
  return addElementToDOM(containerId, text)
}

function handleFormSubmit(formId, targetId) {
  const form = getElementOrError(formId)
  if (!form) return false
  const input = form.querySelector('#user-input')
  const value = input ? input.value.trim() : ''
  if (value === '') {
    displayError('Input cannot be empty')
    return false
  }
  clearError()
  addElementToDOM(targetId, value)
  input.value = ''
  return true
}

function initApp() {
  const clickButton = document.getElementById('simulate-click')
  if (clickButton) {
    clickButton.addEventListener('click', () => {
      simulateClick('dynamic-content', 'Button Clicked!')
    })
  }
  const form = document.getElementById('user-form')
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      handleFormSubmit('user-form', 'dynamic-content')
    })
  }
}

if (typeof document !== 'undefined' && typeof module === 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp)
  } else {
    initApp()
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createElementWithAttributes,
    getElementOrError,
    displayError,
    clearError,
    addElementToDOM,
    removeElementFromDOM,
    updateElementText,
    simulateClick,
    handleFormSubmit,
    initApp,
  }
}