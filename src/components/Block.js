
const Block = ({id, flash, onClick}) => {
    return (
        <div className={!flash ? "block" : "block-light"} onClick={(e) => onClick(e)} id={id}></div>
    )
}

export default Block;