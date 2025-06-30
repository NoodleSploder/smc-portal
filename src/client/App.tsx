
// React
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { RootState } from './components/data/store';

// Layout, Navigation, Error handling
import  Layout  from './components/ui/app-layout';
import { LoadingSpinner } from './components/ui/loading-spinner';
import { ErrorPage } from './components/ui/error-page';

// Routes
import About from './pages/About';
import Home from './pages/Home';
import PeopleSoft from './pages/PeopleSoft';
import CockpitPage from './pages/devops/cockpit';
import DockerPage from './pages/devops/docker';
import KubernetesPage from './pages/devops/kubernetes';
import TerminalPage from './pages/devops/terminal';
import ZOS31page from './pages/mainframes/zos/ZOS31Page';
import SageMath from './pages/tools/sagemath';
import Jupyter from './pages/tools/jupyter';
import FileBrowserPage from './components/ui/FileBrowserPage';


const App = () => {
  const { loading, error } = useSelector((state: RootState) => state.player);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage message={error} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* All routes inside this Layout */}

          {/* Home */}
          <Route index element={<Home />} />

          {/* PeopleSoft */}
          <Route path="peoplesoft" element={<PeopleSoft />} />

          {/* Mainframes */}
          {/* <Route path="mainframes" element={<Mainframes />} /> */}
          <Route path="mainframes/zos31" element={<ZOS31page />} />

          {/* DevOps */}
          <Route path="devops/cockpit" element={<CockpitPage />} />
          <Route path="devops/docker" element={<DockerPage />} />
          <Route path="devops/kubernetes" element={<KubernetesPage />} />
          <Route path="devops/terminal" element={<TerminalPage />} />

          {/* Tools */}
          <Route path="tools/sagemath" element={<SageMath />} />
          <Route path="tools/jupyter" element={<Jupyter />} />

          {/* STL Files */}
          <Route path="stl" element={<FileBrowserPage />} />

          {/* About */}
          <Route path="about" element={<About />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;






