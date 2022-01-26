const sidebar = document.getElementById('board-layout-sidebar')

main()
createObserver()

function main () {
  puzzleRush()
  puzzleBattle()
}

function puzzleRush () {
  const defaultButton = sidebar.querySelector('button[title="New Rush"]')
  if (!defaultButton) {
    return
  }

  const button = createButton([
    'ui_v5-button-component',
    'ui_v5-button-tertiary',
    'ui_v5-button-full',
    'play-action-tray-button'
  ])
  button.onclick = openIncorrectRush

  replaceElement(defaultButton, button)
}

function puzzleBattle () {
  const defaultButton = sidebar.querySelector('button.battle-over-buttons-button')
  if (!defaultButton || defaultButton.title === 'Review') {
    return
  }

  const button = createButton([
    'ui_v5-button-component',
    'ui_v5-button-tertiary',
    'battle-over-buttons-button'
  ])
  button.onclick = openIncorrectBattle

  replaceElement(defaultButton, button)
}

function createButton (classList) {
  const button = document.createElement('button')
  button.type = 'button'
  button.classList.add(...classList)
  button.title = 'Review'

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

  return button
}

function replaceElement (oldElement, newElement) {
  oldElement.insertAdjacentElement('afterend', newElement)
  oldElement.remove()
}

function createObserver () {
  const observer = new MutationObserver(main)
  observer.observe(sidebar, { childList: true, subtree: true })
}

function openIncorrectRush () {
  const puzzles = sidebar.getElementsByClassName('streak-indicator-incorrect')

  for (const puzzle of puzzles) {
    puzzle.click()
  }
}

function openIncorrectBattle () {
  const results = sidebar.querySelector(
    '.battle-player-stats-component .battle-player-stats-results'
  )
  const puzzles = results.getElementsByClassName('streak-icon-square-x')

  // in puzzle battle, the first click shows a preview,
  // and the second click opens a new tab
  // so, click body to reset and then click each puzzle twice
  document.body.click()
  for (const puzzle of puzzles) {
    puzzle.click()
    puzzle.click()
  }
}
