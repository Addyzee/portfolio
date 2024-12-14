const HeaderNav = () => {
  return (
    <div className="header-nav">
      <div>
        <ul className="flex justify-evenly">
          <li>
            <button>
              <h3 className="header-nav-el">Home</h3>
            </button>
          </li>
          <li>
            <button>
              <h3 className="header-nav-el">About</h3>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderNav;
