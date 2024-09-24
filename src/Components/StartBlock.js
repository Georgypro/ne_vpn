import React, { useEffect, useState } from 'react';

const symbols = ['!', '\\+', 'not', '¬', '~', 'не'];

const Spinner = () => {
    const [currentSymbol, setCurrentSymbol] = useState('');
    const [isSpinning, setIsSpinning] = useState(true);

    useEffect(() => {
        let index = 0;
        let speed = 50; // Начальная скорость
        let interval;
        const duration = 3000; // Общая длительность анимации
        const endSpeed = 300; // Конечная скорость

        const spin = () => {
            interval = setInterval(() => {
                setCurrentSymbol(symbols[index]);
                index = (index + 1) % symbols.length;
                if (speed < endSpeed) {
                    speed += (endSpeed - speed) / 10; // Плавное замедление
                    clearInterval(interval);
                    spin();
                } else {
                    clearInterval(interval);
                    setCurrentSymbol('не');
                    setIsSpinning(false);
                }
            }, speed);
        };

        spin();

        setTimeout(() => {
            clearInterval(interval);
            setCurrentSymbol('не');
            setIsSpinning(false);
        }, duration);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ fontSize: '2em', textAlign: 'center', marginTop: '20%' }}>
            {currentSymbol}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <Spinner />
        </div>
    );
};

export default App;
