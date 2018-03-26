import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.checkpoint.CheckpointFactory as CheckpointFactory
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable

WebUI.openBrowser(null)
WebUI.navigateToUrl('https://xpub-faraday.now.sh')

username = findTestObject("SignIn/username")
WebUI.click(username)
WebUI.setText(username, 'admin')

password = findTestObject("SignIn/password")
WebUI.click(password)
WebUI.setText(password, 'admin123')

login = findTestObject("SignIn/login")
WebUI.click(login)

admin = findTestObject("NewUser/adminButton")
WebUI.click(admin)

adminDashboard = findTestObject("NewUser/adminDashboard")
WebUI.click(adminDashboard)

users = findTestObject("NewUser/users")
WebUI.click(users)

admin = findTestObject("EditUser/td_admin")
WebUI.mouseOver(admin)
WebUI.waitForElementVisible(admin, 2)

edit = findTestObject("EditUser/a_Edit")
WebUI.click(edit)

firstName = findTestObject("EditUser/firstName")
WebUI.click(firstName)
WebUI.setText(firstName, 'John')

lastName = findTestObject("EditUser/lastName")
WebUI.click(lastName)
WebUI.setText(lastName, 'Smith')

affiliation = findTestObject("EditUser/affiliation")
WebUI.click(affiliation)
WebUI.setText(affiliation, 'University')

title = findTestObject("EditUser/titleDropDown")
WebUI.click(title)

professor = findTestObject("EditUser/Professor")
WebUI.click(professor)

editorInChief = findTestObject("EditUser/editorInChief")
WebUI.click(editorInChief)

save = findTestObject("EditUser/save")
WebUI.click(save)










