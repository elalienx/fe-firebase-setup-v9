export default function TodoOffClass() {
  return (
    <section>
      <h2>Done offline</h2>
      <ol>
        <li>
          Create Firebase project <code>fe-firebase-setup-v9</code>
        </li>
        <li>
          Create Create React App <code>fe-firebase-setup-v9</code>
        </li>
        <li>
          Changed build to build & deploy (
          <code>react-scripts build && firebase deploy</code>) on{" "}
          <code>package.json</code>
        </li>
        <li>
          Added
          <code>"baseUrl": "src"</code> to <code>tsconfig.json</code>
        </li>
        <li>Host website</li>
        <li>Add Sakura CSS to look descend</li>
        <li>Refactor this todo list outside App.tsx</li>
      </ol>
    </section>
  );
}
