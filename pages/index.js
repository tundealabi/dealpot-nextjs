import Link from 'next/link';
import Layout from '../components/Layout.jsx';
import style from '../styles/Home.module.css';



export default function Home() {
  return (
    <Layout >
      <div className={style.container}>
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
            <img src="/slide1.png" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-md-block border border-warning" style={{marginBottom:"15%"}}>
            <button type="button" className="btn btn-danger">Get started</button>
      </div>
        </div>
        <div className="carousel-item">
          <img src="/slide2.png" className="d-block w-100" alt="..." />
          <div className="carousel-caption d-md-block border border-warning" style={{marginBottom:"15%"}}>
            <button type="button" className="btn btn-danger">Get started</button>
      </div>
        </div>
        <div className="carousel-item">
          <img src="/slide3.png" className="d-block w-100" alt="..." />
          <div className="carousel-caption d-md-block border border-warning" style={{marginBottom:"15%"}}>
            <button type="button" className="btn btn-danger">Get started</button>
      </div>
        </div>
      </div>
    </div>
    </div>
    </Layout>
    
  )
}