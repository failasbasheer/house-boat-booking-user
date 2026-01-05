"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Shared "Balanced Luxury" Config
        const fastEase = "power3.out";
        const fastDuration = 0.8;

        // 1. Fade Up - SOFT TRIGGER
        const fadeElements = containerRef.current.querySelectorAll('.gsap-fade-up');
        fadeElements.forEach((el) => {
            gsap.fromTo(el,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: fastDuration, ease: fastEase,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 98%', // Fires virtually immediately when element touches bottom of screen
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // 1b. Fade Right
        const fadeRightElements = containerRef.current.querySelectorAll('.gsap-fade-right');
        fadeRightElements.forEach((el) => {
            gsap.fromTo(el,
                { x: -30, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: fastDuration, ease: fastEase,
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
        });

        // 1c. Fade Left
        const fadeLeftElements = containerRef.current.querySelectorAll('.gsap-fade-left');
        fadeLeftElements.forEach((el) => {
            gsap.fromTo(el,
                { x: 30, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: fastDuration, ease: fastEase,
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
        });

        // 1d. Scale Up (Snappy Pop)
        const scaleUpElements = containerRef.current.querySelectorAll('.gsap-scale-up');
        scaleUpElements.forEach((el) => {
            gsap.fromTo(el,
                { scale: 0.95, opacity: 0 },
                {
                    scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)',
                    scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none reverse' }
                }
            );
        });

        // 1e. Clip Reveal (Faster Curtain)
        const clipElements = containerRef.current.querySelectorAll('.gsap-clip-reveal');
        clipElements.forEach((el) => {
            gsap.fromTo(el,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.inOut',
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
        });

        // 2. Stagger (Rapid Fire)
        const staggers = containerRef.current.querySelectorAll('.gsap-stagger-container');
        staggers.forEach((container) => {
            const children = container.querySelectorAll('.gsap-stagger-item');
            gsap.fromTo(children,
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: fastEase,
                    scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
        });

        // 3. Parallax (Subtle)
        const parallaxElements = containerRef.current.querySelectorAll('.gsap-parallax');
        parallaxElements.forEach((el) => {
            gsap.to(el, {
                yPercent: -10, ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 } // Low scrub for responsiveness
            });
        });

        // 4b. Calm Rise (Now Faster)
        const calmElements = containerRef.current.querySelectorAll('.gsap-calm-rise');
        calmElements.forEach((el) => {
            gsap.fromTo(el,
                { y: 15, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, ease: fastEase,
                    scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none reverse' }
                }
            );
        });

        // 5. Interactives (Instant Feedback)
        const hoverCards = containerRef.current.querySelectorAll('.gsap-hover-card');
        hoverCards.forEach((el) => {
            el.addEventListener('mouseenter', () => gsap.to(el, { y: -4, scale: 1.01, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.1)", duration: 0.3, ease: 'power2.out' }));
            el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, scale: 1, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", duration: 0.3, ease: 'power2.out' }));
        });

        const hoverCalm = containerRef.current.querySelectorAll('.gsap-hover-calm');
        hoverCalm.forEach((el) => {
            el.addEventListener('mouseenter', () => gsap.to(el, { scale: 1.02, duration: 0.4, ease: 'power2.out' }));
            el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, duration: 0.4, ease: 'power2.out' }));
        });

        const hoverBtns = containerRef.current.querySelectorAll('.gsap-hover-btn');
        hoverBtns.forEach((el) => {
            el.addEventListener('mouseenter', () => gsap.to(el, { scale: 1.03, duration: 0.2, ease: 'back.out(2)' }));
            el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, duration: 0.2, ease: 'power2.out' }));
        });

    }, { scope: containerRef });

    return containerRef;
};
