import Image from 'next/image'

export default function AboutUsBanner() {
  return (
    <div className="about-us-page-top-banner ">
      <Image
        alt="Frequently Asked Questions"
        height={530}
        src="/about-us/about-us-banner.jpg"
        width={1400}
      />
    </div>
  )
}
