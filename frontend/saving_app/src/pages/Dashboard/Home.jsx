import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import {useUserAuth}  from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect } from "react";
import { useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import {IoMdCard} from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinancialOverview from "../../components/Dashboard/FinancialOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
const Home = () => {
    useUserAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
            if(response.data){
                setDashboardData(response.data);
            }
        }catch (error){
            console.error("Error fetching dashboard data", error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        return ()=> {};
    }, []);


    return (
        <DashboardLayout activeMenu="Dashboard">
            <div>Home</div>
            <div className="my-5 mx-auto">
                <div className= "grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total balance"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-blue-500" 
                    />

                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-orange-500"
                    />

                    <InfoCard
                        icon={<LuHandCoins/>}
                        label="Total Expense"
                        value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                        color="bg-red-500"
                    />  
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <RecentTransactions
                        transactions = {dashboardData?.recentTransactions}
                        onSeeMore={() => navigate("/expense")}
                    />

                    <FinancialOverview 
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                    />

                    <ExpenseTransactions
                        transactions = {dashboardData?.last30DaysExpense}
                        onSeeMore={() => navigate("/expense")}
                    />

                    
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Home;
