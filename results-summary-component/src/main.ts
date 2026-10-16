import './style.css';

interface SummaryItem {
  category: string;
  score: number;
  icon: string;
}

// Map each category to its corresponding CSS theme class
const categoryThemeMap: Record<string, string> = {
  Reaction: 'category-reaction',
  Memory: 'category-memory',
  Verbal: 'category-verbal',
  Visual: 'category-visual',
};

/**
 * Animate a numeric counter from 0 to target value
 */
function animateValue(element: HTMLElement, start: number, end: number, duration: number) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = end.toString();
    return;
  }

  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease-out cubic calculation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * (end - start) + start);
    element.textContent = current.toString();

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end.toString();
    }
  };
  window.requestAnimationFrame(step);
}

/**
 * Render summary list items from data
 */
function renderSummary(items: SummaryItem[]) {
  const summaryList = document.getElementById('summary-list');
  if (!summaryList) return;

  // Clear existing items and render fresh from data
  summaryList.innerHTML = items
    .map(
      (item) => `
    <li class="category-item ${categoryThemeMap[item.category] || 'category-reaction'} flex items-center justify-between p-4 rounded-xl cursor-default">
      <div class="flex items-center gap-3">
        <img src="${item.icon}" alt="" width="20" height="20" class="w-5 h-5" aria-hidden="true">
        <span class="category-label font-bold text-base md:text-lg">${item.category}</span>
      </div>
      <div class="font-bold text-base md:text-lg flex items-center gap-1.5">
        <span class="score-value text-dark-gray-blue">${item.score}</span>
        <span class="text-dark-gray-blue/50">/ 100</span>
      </div>
    </li>
  `
    )
    .join('');

  // Animate category scores
  const scoreElements = summaryList.querySelectorAll<HTMLElement>('.score-value');
  scoreElements.forEach((el, index) => {
    const target = items[index]?.score ?? parseInt(el.textContent || '0', 10);
    animateValue(el, 0, target, 1000 + index * 150);
  });
}

/**
 * Initialize application and fetch data
 */
async function init() {
  const overallScoreEl = document.getElementById('overall-score');

  try {
    const response = await fetch('./data.json');
    if (response.ok) {
      const data: SummaryItem[] = await response.json();
      renderSummary(data);

      if (overallScoreEl) {
        const total = data.reduce((acc, curr) => acc + curr.score, 0);
        const avg = Math.round(total / data.length);
        animateValue(overallScoreEl, 0, avg, 1200);
      }
      return;
    }
  } catch (err) {
    console.warn('Could not load data.json dynamically, falling back to static markup', err);
  }

  // Fallback animation for static elements
  if (overallScoreEl) {
    const currentScore = parseInt(overallScoreEl.textContent || '76', 10);
    animateValue(overallScoreEl, 0, currentScore, 1200);
  }

  const staticScores = document.querySelectorAll<HTMLElement>('.score-value');
  staticScores.forEach((el, index) => {
    const target = parseInt(el.textContent || '0', 10);
    animateValue(el, 0, target, 1000 + index * 150);
  });
}

// Setup Continue button interactive feedback
document.addEventListener('DOMContentLoaded', () => {
  init();

  const continueBtn = document.getElementById('continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      continueBtn.classList.add('scale-95');
      setTimeout(() => {
        continueBtn.classList.remove('scale-95');
      }, 150);
    });
  }
});
