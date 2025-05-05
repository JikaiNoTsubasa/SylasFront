import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'xp-gained',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './xp-gained.component.html',
  styleUrl: './xp-gained.component.scss'
})
export class XpGainedComponent {

  @Input() xpBefore = 0;
  @Input() xpAfter = 0;
  @Input() xpMax = 100;
  @Input() levelBefore = 1;
  @Input() levelAfter = 1;
  @Input() label: string | null = null;
  @Input() icon: string | null = null;
  @Input() timer: number = 2;

  segments: { start: number; end: number }[] = [];

  currentXP = 0;
  currentLevel = 0;
  barWidth = 0;

  private animationStart = 0;
  private totalXpGain = 0;
  private totalDuration = this.timer * 1000;

  ngOnInit(): void {
    this.currentXP = this.xpBefore;
    this.currentLevel = this.levelBefore;
    this.totalXpGain = this.calculateTotalXpGain();

    requestAnimationFrame(this.animateXp.bind(this));
  }

  calculateTotalXpGain(): number {
    if (this.levelBefore === this.levelAfter) {
      return this.xpAfter - this.xpBefore;
    }

    const xpCurrentLevel = this.xpMax - this.xpBefore;
    const xpIntermediateLevels = (this.levelAfter - this.levelBefore - 1) * this.xpMax;
    const xpFinalLevel = this.xpAfter;

    return xpCurrentLevel + xpIntermediateLevels + xpFinalLevel;
  }

  animateXp(timestamp: number) {
    if (!this.animationStart) this.animationStart = timestamp;
    const elapsed = timestamp - this.animationStart;

    const progress = Math.min(elapsed / this.totalDuration, 1);
    const xpGained = this.totalXpGain * progress;

    let remainingXp = this.xpBefore + xpGained;
    let level = this.levelBefore;

    while (remainingXp >= this.xpMax) {
      remainingXp -= this.xpMax;
      level++;
    }

    this.currentLevel = level;
    this.currentXP = Math.floor(remainingXp);
    this.barWidth = (remainingXp / this.xpMax) * 100;

    if (progress < 1) {
      requestAnimationFrame(this.animateXp.bind(this));
    }
  }
}
