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

WebUI.navigateToUrl('xpub-faraday.now.sh')

username = findTestObject('SignIn/username')

WebUI.click(username)

WebUI.setText(username, 'admin')

password = findTestObject('SignIn/password')

WebUI.click(password)

WebUI.setText(password, 'admin123')

loginButton = findTestObject('SignIn/login')

WebUI.click(loginButton)

status = findTestObject("ManuscriptFilters/Status")
WebUI.click(status)

submitted = findTestObject("ManuscriptFilters/Submitted")
WebUI.click(submitted)
WebUI.waitForElementVisible(submitted, 2)

status = findTestObject("ManuscriptFilters/Status")
WebUI.click(status)

draft = findTestObject("ManuscriptFilters/Draft")
WebUI.click(draft)
WebUI.waitForElementVisible(draft, 2)

status = findTestObject("ManuscriptFilters/Status")
WebUI.click(status)

all = findTestObject("ManuscriptFilters/All")
WebUI.click(all)
WebUI.waitForElementVisible(all, 3)
WebUI.scrollToPosition(854, 988)
WebUI.waitForElementVisible(all, 2)

WebUI.closeBrowser()
