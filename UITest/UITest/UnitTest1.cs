using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

namespace UITest
{
    [TestClass]
    public class UnitTest1
    {
        private static readonly string DriverDirectory = "C:\\SeleniumDriver";
        private static IWebDriver _driver;

        [ClassInitialize]
        public static void Setup(TestContext context)
        {
            _driver = new FirefoxDriver(DriverDirectory);
        }

        [ClassCleanup]
        public static void TearDown()
        {
            _driver.Dispose();
        }

        [TestMethod]
        public void TestMethod1()
        {
            _driver.Navigate().GoToUrl("http://localhost:3000/");

            Assert.AreEqual("BirdBox", _driver.Title);

            WebDriverWait wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(10));
            IWebElement cleanTimer = wait.Until<IWebElement>(d => d.FindElement(By.Id("cleanTimer")));
            Assert.IsTrue(cleanTimer.Text.Contains("3d 23h 59m"));

            wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(10));
            IWebElement feedTimer = wait.Until<IWebElement>(d => d.FindElement(By.Id("feedTimer")));
            Assert.IsTrue(feedTimer.Text.Contains("6d 23h 59m"));

            wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(10));
            IWebElement videoLog = wait.Until<IWebElement>(d => d.FindElement(By.Id("videoLogs")));
            Assert.IsTrue(videoLog.Text.Contains("#38: 2019-12-04 13:23"));
            
            wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(10));
            IWebElement temperature = wait.Until<IWebElement>(d => d.FindElement(By.Id("temp")));
            Assert.IsTrue(temperature.Text.Contains(" grader c"));
        }

    }
}
