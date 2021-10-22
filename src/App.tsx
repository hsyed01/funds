// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import RtlLayout from './components/RtlLayout';
import ThemePrimaryColor from './components/ThemePrimaryColor';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
          <Router />
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
