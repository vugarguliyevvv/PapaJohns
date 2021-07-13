import PageTitle from '../../UI/PageTitle';
import Addresses from './Addresses';
import Map from './Map';

function Branches() {
    return (
        <section className='section-branches'>
            <PageTitle title='FİLİALLAR' />
            <Addresses />
            <Map />
        </section>
    );
}

export default Branches;