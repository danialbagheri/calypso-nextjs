import Image from 'next/image'
export default function HistoryBanner() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div className="about-us-page-top-banner ">
      <picture>
        <Image
          alt="Calypso Brand History product range"
          height={840}
          src="/history/historybanner.png"
          width={1377}
        />
      </picture>
    </div>
  )
}
