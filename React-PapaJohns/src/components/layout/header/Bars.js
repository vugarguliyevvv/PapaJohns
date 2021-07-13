function Bars({ onToggleNav, isOpened }) {
    return (
        <button onClick={() => onToggleNav()} className={`bars ${isOpened ? 'bars--opened' : ''}`}>
            <span className='bars__content'></span>
        </button>
    );
}

export default Bars;