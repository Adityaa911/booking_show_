import  { useEffect, useState } from "react";
import { Layout, Carousel, Card, Row, Col, Typography } from "antd";
import "./homepage.css";
import {getAllmovies} from "../../Apis/Movies"// your backend API
import dayjs from 'dayjs';
import {useNavigate} from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const HomePage = () => {

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const fetchmovie = async () => {
    try {
      const response = await getAllmovies();
      const allmovies = response.data;
      setMovies(allmovies); // depends on your backend response
      console.log(allmovies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchmovie();
  }, []);

  return (
    <Layout>

      {/* HEADER */}
      <Header className="header">
        <h2 className="logo">🎬 BookMyShow</h2>
      </Header>

      <Content className="content">

        {/* BANNER */}
        <Carousel autoplay className="banner">
          <div>
          {movies.slice(0, 3).map((movie) => (
             <div key={movie._id}>
               <img src={movie.posterUrl} alt="banner" />
            </div>
          ))}
          </div>
        </Carousel>

        {/* MOVIES */}
        <Title level={3}>Recommended Movies</Title>

        <Row gutter={[20, 20]}>
          {movies.map((movie) => (
            <Col xs={24} sm={12} md={8} lg={6} key={movie._id}>
              <Card
                hoverable
                className="movie-card"
                cover={
                  <img
                    alt={movie.title}
                    src={movie.posterUrl}
                    onClick = {
                      () => {
                        navigate(`/movies/${movie._id}?date=${dayjs().format('YYYY-MM-DD')}`)
                      }
                    }

                    className="movie-image"
                  />
                }
              >
                <Card.Meta title={movie.title} description={movie.genre} />
              </Card>
            </Col>
          ))}
        </Row>

      </Content>
    </Layout>
  );
};

export default HomePage;
