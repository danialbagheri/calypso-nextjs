export default function SunBanner() {
  return (
    <figure className="sun-animation">
      <section
        aria-label="Animation of the sun rising very quickly"
        class="animation__block"
        role="img"
      >
        {/* <div class="hill front red-dk" />
            <div class="hill back red" /> */}
        <div class="sun" />
        <div className="be-sun-ready-heading">
          <p className="sun-ready-title">BE SUN READY</p>
          <p className="sun-ready-secondary">
            LEARNING HOW TO PROTECT
            <br /> YOURSELF FROM THE SUN
          </p>
        </div>
      </section>
    </figure>
  )
}
