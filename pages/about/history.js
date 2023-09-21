import HistoryBanner from '../../components/history/HistoryBanner'
import HistoryIntro from '../../components/history/HistoryIntro'
import Timeline from '../../components/history/Timeline'
import GetInTouch from '../../components/about/GetInTouch'
// import logo from "./logo.svg";
export default function History() {
  return (
    <div>
      <HistoryBanner />
      <HistoryIntro />
      <Timeline />
      <GetInTouch />
      <div className="top50" />
    </div>
  )
}
