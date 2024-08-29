import Layout from "./layout/Layout"
import YellowBoxContainer from "./indexPage/YellowBoxContainer"
import CharacterGallery from "./indexPage/CharacterGallery"

const HomePage = () => {
  return (
    <>
    <Layout>
    <YellowBoxContainer />
    <CharacterGallery />
    </Layout>
    </>
  )
}

export default HomePage