import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100, magnetTarget: null });
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const cursorRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const updateMousePosition = (e) => {
            setMousePosition(prev => {
                if (document.documentElement.classList.contains('magnetic-active') && prev.magnetTarget) {
                    // Very soft magnetic pull
                    const targetX = prev.magnetTarget.x;
                    const targetY = prev.magnetTarget.y;
                    // Move 15% towards the center of the element, 85% standard mouse position
                    return {
                        x: e.clientX + (targetX - e.clientX) * 0.15,
                        y: e.clientY + (targetY - e.clientY) * 0.15,
                        magnetTarget: prev.magnetTarget
                    };
                }
                return { x: e.clientX, y: e.clientY, magnetTarget: null };
            });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const clickable = target.closest('button, a, input, textarea, [tabindex="0"]');

            if (clickable) {
                setIsHovering(true);

                // Magnetic effect logic for decently sized buttons (avoid snapping to huge cards)
                if (clickable.tagName.toLowerCase() === 'button' || clickable.tagName.toLowerCase() === 'a') {
                    const rect = clickable.getBoundingClientRect();
                    if (rect.width > 30 && rect.height > 30 && rect.width < 150 && rect.height < 100) {
                        document.documentElement.classList.add('magnetic-active');
                        setMousePosition(prev => ({
                            ...prev,
                            magnetTarget: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
                        }));
                    }
                }
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
            document.documentElement.classList.remove('magnetic-active');
            setMousePosition(prev => ({ ...prev, magnetTarget: null }));
        };

        if (!isMobile) {
            window.addEventListener('mousemove', updateMousePosition);
            window.addEventListener('mouseover', handleMouseOver);
            window.addEventListener('mouseout', handleMouseOut);
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center bg-white shadow-sm"
            style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                width: isHovering ? '60px' : '20px',
                height: isHovering ? '60px' : '20px',
                transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.1)' : 'scale(1)'}`,
                opacity: mousePosition.x === -100 ? 0 : 1
            }}
        />
    );
};

export default CustomCursor;
