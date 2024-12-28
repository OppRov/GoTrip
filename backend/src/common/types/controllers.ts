import AuthController from "../../authentication/auth.controller";
import UserController from "../../users/user.controller";
import TripController from "../../trip/trip.controller";

export type Controllers = UserController | AuthController | TripController;