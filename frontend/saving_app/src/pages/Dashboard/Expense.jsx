import React, {useEffect, useState} from "react"
import { useUserAuth } from "../../hooks/useUserAuth"
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";


const Expense = () => {
    useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);


    // Fetch all income on mount
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) setExpenseData(response.data);
    } catch (error) {
      console.error("❌ Error fetching expense data in front", error);
      toast.error("Error fetching expense data in front");
    } finally {
      setLoading(false);
    }
  };

  // Add a new income record
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Validation checks
    if (!category.trim()) {
      toast.error("Please enter expense category");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter valid expense amount");
      return;
    }
    if (!date) {
      toast.error("Please enter expense date");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("❌ Error adding expense", error);
      toast.error("Error adding expense");
    }
  };


  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);




  
    return (
        <DashboardLayout activeMenu={"Expense"}>
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview 
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}
                        />
                    </div>
                </div>

                <Modal 
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense} />
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Expense  