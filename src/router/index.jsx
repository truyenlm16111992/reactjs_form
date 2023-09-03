import { MainLayout } from 'components'
import { BTForm } from "pages"
export const router = [
    {
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <BTForm />
            }
        ]
    }
]