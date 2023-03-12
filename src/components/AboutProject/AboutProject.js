import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__line"></div>
      <article className="about-project__article">
        <div className="about-project__text-container">
          <h3 className="about-project__article-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__article-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__text-container">
          <h3 className="about-project__article-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__article-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </article>
      <div className="about-project__infographics">
        <div className="about-project__left-container">
          <div className="about-project__infographics-left-container">
            <p className="about-project__first-part">1 неделя</p>
          </div>
          <p className="about-project__undertext">Back-end</p>
        </div>
        <div className="about-project__right-container">
          <div className="about-project__infographics-right-container">
            <p className="about-project__second-part">4 недели</p>
          </div>
          <p className="about-project__undertext">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
