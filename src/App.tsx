import { Component, createRef, RefObject } from 'react';
import { Header, Main, Footer } from './components';
import { ErrorBoundary } from './components';

class App extends Component {
  mainRef: RefObject<Main>;

  constructor(props: NonNullable<unknown>) {
    super(props);
    this.mainRef = createRef();
  }

  handleSearch = (search: string): void => {
    if (this.mainRef.current) {
      this.mainRef.current.fetchMovies(search);
    }
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="wrapper">
          <Header onSearch={this.handleSearch} />
          <Main ref={this.mainRef} />
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
