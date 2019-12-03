using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PipRest.Controllers;
using PipRest.Model;

namespace UnitTestProject
{
    [TestClass]
    public class UnitTest1
    {
        private static StartTimeController stc = new StartTimeController();
        private int numberOfRecords;

        [ClassInitialize]
        public static void StartUpInit(TestContext c)
        {
            stc.Post(new StartInfo(0, "TestOne"));
        }

        [TestInitialize]
        public void Init()
        {
            numberOfRecords = stc.GetAll().Count();
        }

        [TestMethod]
        public void TestGetAll()
        {
            Assert.AreEqual(numberOfRecords,stc.GetAll().Count());
        }

        [TestMethod]
        public void TestPost()
        {
            stc.Post(new StartInfo(0,"Test"));
            Assert.AreEqual(numberOfRecords+1, stc.GetAll().Count());
        }

        [TestMethod]
        public void TestDelete()
        {
            stc.Post(new StartInfo(0, "Test"));
            List<StartInfo> sList = stc.GetAll();
            int idOfLast = sList[sList.Count - 1].Id;
            stc.Delete(idOfLast);
            Assert.AreEqual(numberOfRecords, stc.GetAll().Count());
        }

        [ClassCleanup]
        public static void CleanUp()
        {
            List<StartInfo> sList = stc.GetAll();
            int idOfLast = sList[sList.Count - 1].Id;
            stc.Delete(idOfLast);
            sList = stc.GetAll();
            idOfLast = sList[sList.Count - 1].Id;
            stc.Delete(idOfLast);
        }
    }
}
