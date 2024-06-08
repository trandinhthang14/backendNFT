const MainMiddleware = (app, cors, express) => {
  const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(express.json());
};

export { MainMiddleware };
