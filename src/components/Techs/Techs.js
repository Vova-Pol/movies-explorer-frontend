import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__line"></div>
      <article className="techs__article">
        <h3 className="techs__article-title">7 технологий</h3>
        <p className="techs__article-text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </article>
      <ul className="techs__stack-list">
        <li className="tech__skill-item">
          <p className="tech__skill">HTML</p>
        </li>
        <li className="tech__skill-item">
          <p className="tech__skill">CSS</p>
        </li>
        <li className="tech__skill-item">
          <p className="tech__skill">JS</p>
        </li>
        <li className="tech__skill-item">
          <p className="tech__skill">React</p>
        </li>
        <li className="tech__skill-item">
          <p className="tech__skill">Git</p>
        </li>
        <li className="tech__skill-item">
          <p className="tech__skill">Express.js</p>
        </li>
        <li className="tech__skill-item">
          <p className="tech__skill">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
