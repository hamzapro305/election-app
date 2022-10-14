const SimpleRoutes = [
    {
        name: "Home",
        path: "/",
    },
];

const AllRoutes = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Apply For Candidate",
        path: "/ApplyForCandidate",
    },
]

const Routes = (status) => status ? AllRoutes : SimpleRoutes

export { Routes };
