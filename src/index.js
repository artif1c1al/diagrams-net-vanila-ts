import './style.css';
import Framework, {useState} from 'framework-8652';


/** @jsx Framework.createElement */
function Counter() {
  const [state, setState] = useState(1);
  return (
        <h1 onClick={() => setState((c) => c + 1)} style="user-select: none">
            Count: {state}
        </h1>
  );
}
const element = <Counter />;
const container = document.getElementById('root');
Framework.render(element, container);
