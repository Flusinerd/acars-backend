export { };

declare global {
  namespace Express {
    interface User {
      currentLocation: string;
      email: string;
      firstName: string;
      flightHours: number;
      name: string;
      pilotId: number;
      totalDistance: number;
      totalFlights: number;
      totalPax: number;
    }
  }
}