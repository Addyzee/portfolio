interface NavProps{
  changeNav:  (name : string) => void
}

const HeaderNav = ({changeNav}:NavProps) => {
  const onClickNav = (name : string): (() => void) => () => changeNav(name)

  return (
    <div className="header-nav">
      <div>
        <ul className="flex justify-evenly">
          <li>
            <button onClick={onClickNav('Home')}>
              <h3 className="header-nav-el">Home</h3>
            </button>
          </li>
          <li>
            <button onClick={onClickNav('About')}>
              <h3 className="header-nav-el">About</h3>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderNav;
