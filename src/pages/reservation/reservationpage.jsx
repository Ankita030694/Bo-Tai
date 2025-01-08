import Footer from '../../components/Footer/footer';
import { AnimatePresence, motion } from 'framer-motion';
import ReservationComponent from '../../components/Reservation/reservationComponent';
import NavbarTwo from '../../components/Navbar/navbar2';
import ReservationForm from '../../components/Reservation/reservationform';
import Navbar from '../../components/Navbar/navbar';
function Reservation() {


    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
              
                <NavbarTwo />
                {/* <ReservationComponent /> */}
                <ReservationForm />
                <Footer />
            </motion.div>

        </AnimatePresence>

    );
}

export default Reservation;
