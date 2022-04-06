import React from "react";

const RefreshButton = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <button
      style={{ margin: "auto", width: "120px" }}
      onClick={handleClick}
    >
      Recargar
    </button>
  );
};

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({
      error,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <div>
            <div>
              <h1>Ups! Ha ocurrido un error inesperado</h1>
            </div>
            <RefreshButton />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}