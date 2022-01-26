const sidebar = document.getElementById('board-layout-sidebar')

replaceButton()
createObserver()

function replaceButton () {
  const defaultButton = sidebar.querySelector('[title="New Rush"]')
  if (!defaultButton) {
    return
  }

  const button = document.createElement('button')
  button.type = 'button'
  button.classList.add(
    'ui_v5-button-component',
    'ui_v5-button-tertiary',
    'ui_v5-button-full',
    'play-action-tray-button'
  )
  button.title = 'Review'
  button.onclick = openIncorrect

  const span1 = document.createElement('span')
  span1.classList.add(
    'icon-font-chess',
    'ui_v5-button-icon',
    'incorrect'
  )
  button.appendChild(span1)

  const span2 = document.createElement('span')
  span2.innerText = 'Review'
  button.appendChild(span2)

  defaultButton.insertAdjacentElement('afterend', button)
  defaultButton.remove()
}

function openIncorrect () {
  const puzzles = sidebar.getElementsByClassName('streak-indicator-incorrect')

  for (const puzzle of puzzles) {
    puzzle.click()
  }
}

function createObserver () {
  const observer = new MutationObserver(replaceButton)
  observer.observe(sidebar, { childList: true, subtree: true })
}
